package com.crime.reporting.util;

public class CaseIdUtil {

    public static String getCrimePrefix(String crimeType) {

        return switch (crimeType.toUpperCase()) {
            case "THEFT" -> "TH";
            case "ASSAULT" -> "AS";
            case "MURDER" -> "MUR";
            case "CYBER CRIME" -> "CBC";
            case "KIDNAPPING" -> "KD";
            
            default -> "CR";
        };
    }
}
