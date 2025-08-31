-- CreateTable
CREATE TABLE `grade` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `User_ID` INTEGER NOT NULL,
    `Student_ID` INTEGER NOT NULL,
    `Subject_ID` INTEGER NOT NULL,
    `Marks` VARCHAR(100) NOT NULL,
    `Grade` VARCHAR(100) NOT NULL,
    `Term-ID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `Student_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `F_name` VARCHAR(50) NOT NULL,
    `L_name` VARCHAR(50) NOT NULL,
    `User_ID` INTEGER NOT NULL,
    `Class` VARCHAR(10) NOT NULL,
    `registered_on` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`Student_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `Subject_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    `User_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Subject_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `term` (
    `Term_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `User_ID` INTEGER NOT NULL,
    `Name` VARCHAR(50) NOT NULL,
    `Start_Date` DATE NOT NULL,
    `End_Date` DATE NOT NULL,

    INDEX `userFK`(`User_ID`),
    PRIMARY KEY (`Term_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `FName` VARCHAR(50) NOT NULL,
    `LName` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(200) NOT NULL,
    `CreationDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
