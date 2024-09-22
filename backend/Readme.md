# Real-Time Face Attendance System

This project demonstrates the creation of a real-time Face Attendance system with a graphical interface and live database integration. The system allows for face recognition, data storage, attendance tracking, and graphical display of relevant information.

## Table of Contents
1. [Introduction](#introduction)
2. [Overview](#overview)
3. [Setup](#setup)
4. [Webcam](#webcam)
5. [Graphics](#graphics)
6. [Encoding Generator](#encoding-generator)
7. [Face Recognition](#face-recognition)
8. [Database Setup](#database-setup)
9. [Add Data to the Database](#add-data-to-the-database)
10. [Upload Images to the Database](#upload-images-to-the-database)
11. [Download User Data](#download-user-data)
12. [Update Attendance](#update-attendance)
13. [Check if Already Marked](#check-if-already-marked)
14. [Loading](#loading)

## Introduction
In this project, we implement a real-time Face Attendance system using face recognition technology. The system is designed to recognize faces in real-time using a webcam, mark attendance, and update a live database with attendance records.

## Overview
The system consists of multiple components, including webcam integration, graphical user interface, face encoding generator, face recognition algorithm, and database integration. These components work together to create a seamless attendance tracking system.

## Setup
Ensure you have all the necessary dependencies installed and the project files set up correctly. Refer to the code files for specific requirements.

## Webcam
The system utilizes a webcam to capture real-time video feed for face recognition. Ensure your webcam is correctly connected and configured.

## Graphics
The project includes graphical elements for user interaction and visualization of attendance data. Graphics are displayed using OpenCV and other libraries.

## Encoding Generator
The encoding generator script preprocesses student images, generates face encodings, and saves them for later use in face recognition.

## Face Recognition
The system employs face recognition algorithms to match detected faces with known student identities. It marks attendance based on recognized faces.

## Database Setup
The project integrates with Firebase for real-time database functionality. Ensure you have the necessary credentials and configurations set up for database access.

## Add Data to the Database
The script `AddDatatoDatabase.py` adds sample student data to the Firebase database. Modify this script to add your own student data.

## Upload Images to the Database
Images of students are uploaded to the Firebase storage. Ensure correct file paths and configurations for image uploads.

## Download User Data
The system retrieves student data from the Firebase database for attendance tracking and display.

## Update Attendance
Attendance records are updated in real-time on the Firebase database. The system tracks attendance and updates records accordingly.

## Check if Already Marked
The system checks if a student's attendance has already been marked within a specified time frame to prevent duplicate entries.

## Loading
The system includes loading indicators to provide feedback during data retrieval and processing.

## Code
Refer to the provided code files (`main.py`, `EncodeGenerator.py`, `AddDatatoDatabase.py`) for the implementation details.

For any issues or inquiries, please refer to the code documentation or contact the project maintainer.

**Note**: Ensure all necessary libraries and dependencies are installed before running the project.
