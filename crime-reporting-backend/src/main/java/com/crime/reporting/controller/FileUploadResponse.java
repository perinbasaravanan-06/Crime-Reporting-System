// ==================== Package Declaration ==============================
package com.crime.reporting.controller;

// ==================== Import Statements ==============================
import lombok.Data;

// ==================== DTO Class Declaration ==============================
@Data
public class FileUploadResponse {

    // ==================== File Metadata Fields ==============================
    private String fileName;
    private String fileType;
    private String fileUrl;
}
