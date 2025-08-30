import os
import sys
import subprocess
from pathlib import Path

def print_header(title):
    """Print a formatted header"""
    print("\n" + "="*60)
    print(f"🚀 {title}")
    print("="*60)

def print_step(step, description):
    """Print a formatted step"""
    print(f"\n📋 Step {step}: {description}")
    print("-" * 40)

def check_python_version():
    """Check if Python version is compatible"""
    print_step(1, "Checking Python Environment")
    
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required!")
        print(f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def setup_virtual_environment():
    """Set up virtual environment"""
    print_step(2, "Setting up Virtual Environment")
    
    venv_path = Path(".venv")
    if venv_path.exists():
        print("✅ Virtual environment already exists")
        return True
    
    try:
        print("🔧 Creating virtual environment...")
        subprocess.check_call([sys.executable, "-m", "venv", ".venv"])
        print("✅ Virtual environment created successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create virtual environment: {e}")
        return False

def install_requirements():
    """Install required packages"""
    print_step(3, "Installing Python Dependencies")
    
    # Install backend requirements only
    print("📦 Installing backend requirements...")
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-r", "backend_requirements.txt"
        ])
        print("✅ Backend requirements installed!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install backend requirements: {e}")
        return False
    
    return True

def setup_backend():
    """Set up the backend directory"""
    print_step(4, "Setting up Backend")
    
    backend_dir = Path("medisum-backend")
    if not backend_dir.exists():
        print("🔧 Creating backend directory...")
        backend_dir.mkdir(exist_ok=True)
    
    # Copy backend files if they don't exist
    backend_files = ["backend_example.py", "backend_requirements.txt"]
    for file_name in backend_files:
        src_path = Path(file_name)
        dst_path = backend_dir / file_name
        
        if not dst_path.exists() and src_path.exists():
            print(f"📁 Copying {file_name} to backend directory...")
            with open(src_path, 'r') as src, open(dst_path, 'w') as dst:
                dst.write(src.read())
    
    print("✅ Backend setup complete!")

def print_next_steps():
    """Print next steps for the user"""
    print_step(5, "Next Steps")
    
    print("🎯 Your MediSum project is now set up! Here's what to do next:")
    
    print("\n1️⃣ **Start the Backend**:")
    print("   cd medisum-backend")
    print("   python backend_example.py")
    print("   # Backend will run on http://localhost:8000")
    
    print("\n2️⃣ **Start the Frontend**:")
    print("   cd medisum-flow")
    print("   npm run dev")
    print("   # Frontend will run on http://localhost:3000")
    
    print("\n3️⃣ **Test the System**:")
    print("   - Open http://localhost:3000 in your browser")
    print("   - Navigate to the Summarize page")
    print("   - Test the medical Q&A summarization")
    print("   - Try the PDF uploader on the homepage")
    
    print("\n📚 **Documentation**:")
    print("   - README.md - Project overview")
    print("   - QUICK_START.md - Quick start guide")

def main():
    """Main setup function"""
    print_header("MediSum Project Setup")
    
    print("This script will set up your MediSum project including:")
    print("✅ Python environment and dependencies")
    print("✅ Backend API server")
    print("✅ Integration between frontend and backend")
    
    # Check Python version
    if not check_python_version():
        return False
    
    # Set up virtual environment
    if not setup_virtual_environment():
        return False
    
    # Install requirements
    if not install_requirements():
        return False
    
    # Set up backend
    setup_backend()
    
    # Print next steps
    print_next_steps()
    
    print_header("Setup Complete! 🎉")
    print("Your MediSum project is ready to use!")
    
    return True

if __name__ == "__main__":
    try:
        success = main()
        if success:
            print("\n✅ Setup completed successfully!")
        else:
            print("\n❌ Setup failed. Please check the errors above.")
    except KeyboardInterrupt:
        print("\n\n⚠️  Setup interrupted by user.")
    except Exception as e:
        print(f"\n❌ Unexpected error during setup: {e}")
        import traceback
        traceback.print_exc()
