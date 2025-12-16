package com.crime.reporting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.MissingPersonRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;

@Service
public class MissingPersonService {

    @Autowired
    private MissingPersonRepository missingPersonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PoliceRepository policeRepository;

    // ================= CREATE =================
    public MissingPerson createMissingPerson(MissingPerson missingPerson, Long userId) {

        //Assign reporting user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        missingPerson.setReportedBy(user);

        //Assign Sub Inspector with least missing cases
        Police assignedSI = findLeastBusySubInspector();
        missingPerson.setAssignedPolice(assignedSI);

        //Save
        return missingPersonRepository.save(missingPerson);
    }

    // ================= READ =================
    public List<MissingPerson> getAllMissingPersons() {
        return missingPersonRepository.findAll();
    }

    public MissingPerson getMissingPersonById(Long id) {
        return missingPersonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Missing person not found"));
    }

    // ================= CORE LOGIC =================
    private Police findLeastBusySubInspector() {

        List<Police> policeList = policeRepository.findAll();

        Police selected = null;
        long minCount = Long.MAX_VALUE;

        for (Police police : policeList) {

            //ONLY SI
            if (!"SI".equalsIgnoreCase(police.getRank())) {
                continue;
            }

            long count = missingPersonRepository.countByAssignedPolice(police);

            if (count < minCount) {
                minCount = count;
                selected = police;
            }
        }

        if (selected == null) {
            throw new RuntimeException("No Sub Inspector available");
        }

        return selected;
    }
}
