package com.crime.reporting.controller;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crime.reporting.service.CloudinaryService;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    private final CloudinaryService cloudinaryService;

    public FileUploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    // ==================== Missing Person Photo Upload ====================
    @PostMapping(
            value = "/missing-person",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String uploadMissingPersonPhoto(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        System.out.println("UPLOAD BY USER: " + authentication.getName());

        // 🔥 Upload to Cloudinary
        return cloudinaryService.uploadFile(file, "missing-person");
    }

    // ==================== Evidence Upload ====================
    @PostMapping(
            value = "/evidence",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public FileUploadResponse uploadEvidence(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String mimeType = file.getContentType();
        String fileType =
                mimeType != null && mimeType.startsWith("image") ? "IMAGE" :
                mimeType != null && mimeType.startsWith("video") ? "VIDEO" :
                "DOCUMENT";

        String fileUrl =
                cloudinaryService.uploadFile(file, "evidence");

        FileUploadResponse response = new FileUploadResponse();
        response.setFileName(file.getOriginalFilename());
        response.setFileType(fileType);
        response.setFileUrl(fileUrl);

        return response;
    }
}
