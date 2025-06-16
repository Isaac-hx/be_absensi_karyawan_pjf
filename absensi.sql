CREATE TABLE karyawan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    no_telp VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    gender ENUM('male', 'female') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    pasword VARCHAR(100) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE absensi (
    absensi_id INT AUTO_INCREMENT PRIMARY KEY, -- Add a primary key for efficiency and indexing
    karyawan_id INT NOT NULL, -- Foreign key to link with karyawan table
    location VARCHAR(100) NOT NULL, -- Location cannot be NULL
    url_profile VARCHAR(255) NOT NULL, -- URL for profile image, cannot be NULL
    url_signature VARCHAR(255) NOT NULL, -- URL for signature, cannot be NULL
    target_work TEXT NULL, -- Allow NULL for target work
    result_work TEXT NULL, -- Allow NULL for result work
    check_in DATETIME NULL, -- Allow NULL for check-in
    check_out DATETIME NULL, -- Allow NULL for check-out
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Automatically set the current timestamp
    FOREIGN KEY (karyawan_id) REFERENCES karyawan(id) -- Foreign key linking to karyawan table
        ON DELETE CASCADE -- Optional: Delete absensi entries if the related karyawan is deleted
        ON UPDATE CASCADE -- Optional: Update absensi entries if karyawan_id changes
);



