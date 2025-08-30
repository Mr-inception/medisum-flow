# MediSum - Medical AI Summarization Platform

A React-based medical summarization platform with AI integration for generating patient-friendly and clinician-focused summaries from medical documents and Q&A.

## Features

- **PDF Document Processing**: Upload and process medical PDFs directly from the homepage
- **AI-Powered Summarization**: Intelligent medical content analysis and summarization
- **Dual Perspectives**: Generate summaries for both patients and healthcare professionals
- **Real-time Processing**: Live progress tracking and instant results
- **Medical Safety**: Built-in content validation and safety protocols
- **Modern UI**: Clean, accessible interface built with shadcn/ui components

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for AI backend)
- PyPDF2 for PDF processing

### Complete Setup

1. **Run the setup script:**
   ```bash
   cd medisum-flow
   python setup_complete.py
   ```

2. **Start the backend:**
   ```bash
   cd medisum-backend
   python backend_example.py
   ```

3. **Start the frontend:**
   ```bash
   cd medisum-flow
   npm run dev
   ```

4. **Access your system:**
   - Frontend: http://localhost:3000 (or 8080)
   - Backend: http://localhost:8000

## How to Use

### PDF Document Processing

1. **Upload Medical PDFs**: Drag & drop or click to upload PDF documents
2. **Choose Perspective**: Select patient-friendly or clinician-focused summaries
3. **Generate Summaries**: Get AI-powered medical insights instantly
4. **Copy & Share**: Use the copy button to share summaries

### Medical Q&A Summarization

1. **Navigate to Summarize page**
2. **Enter medical questions and answers**
3. **Select target audience (patient/clinician)**
4. **Generate intelligent summaries**

## API Endpoints

The backend provides these endpoints:

```http
POST /upload-pdf
{
  "pdf_content": "base64_encoded_pdf",
  "perspective": "patient|clinician",
  "max_length": 200
}

POST /generate
{
  "question": "Medical question",
  "answer": "Detailed medical answer", 
  "perspective": "patient|clinician",
  "max_tokens": 1000,
  "temperature": 0.7
}

GET /status
GET /health
POST /validate
```

## Project Structure

```
medisum-flow/
├── src/                    # React frontend source
│   ├── pages/             # Application pages
│   ├── components/        # Reusable UI components
│   └── lib/               # Utility functions
├── medisum-backend/       # Flask backend
│   ├── backend_example.py # Main backend server
│   └── requirements.txt   # Python dependencies
├── public/                # Static assets
└── setup_complete.py      # Project setup script
```

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Flask, PyPDF2, Transformers, PyTorch
- **AI**: HuggingFace Transformers pipeline
- **PDF Processing**: PyPDF2 for text extraction

## Medical Safety Features

- **Content Validation**: Built-in safety checks for medical content
- **Perspective Control**: Tailored summaries for different audiences
- **Professional Disclaimers**: Clear medical advice disclaimers
- **Error Handling**: Graceful fallbacks for processing issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section in QUICK_START.md
2. Review the backend logs for error details
3. Ensure all dependencies are properly installed

## Disclaimer

This AI-powered medical summarization tool is designed for educational and research purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.
