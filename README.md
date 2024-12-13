# Assignment Grading Platform

A modern web application for automatic assignment analysis and grading, built with **Next.js**, **MongoDB**, and **AI tools**. The platform streamlines the process of grading assignments for teachers, providing students with instant feedback, and enabling admins to manage the system effectively.

## Features
### **Students**
- Upload assignments in PDF or image formats.
- View graded assignments and feedback.
- Track assignment statuses.

### **Teachers**
- View and analyze student submissions.
- Automatically grade assignments using AI.
- Provide feedback and adjust grades if needed.

### **Admins**
- Manage users (students and teachers).
- Monitor platform activity.
- Oversee assignment analysis workflows.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, MongoDB
- **Authentication**: JWT and Role-Based Access
- **File Uploads**: Multer, Cloudinary
- **AI Analysis**: Hugging Face, TensorFlow.js
- **Deployment**: Vercel or similar

## Setup
### Prerequisites
- Node.js v16+ installed
- MongoDB instance (local or Atlas)
- Environment variables configured (`.env.local` file)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/assignment-grading-platform.git
   cd assignment-grading-platform
