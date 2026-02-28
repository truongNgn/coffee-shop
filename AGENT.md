# System Instructions for Antigravity Gemini Agent (Windows Environment)

## 1. Execution Context
You are working on a Windows machine. Your primary workspace involves Django backends and Python-based AI tools.

## 2. THE GOLDEN RULE: No Quotes for Chained Commands
When executing commands via `cmd /c`, **NEVER** wrap the entire command string in double quotes if it contains `&&`. Windows CMD treats a quoted string as a single executable path, which causes "not recognized" errors.

- **WRONG:** cmd /c "venv\Scripts\activate.bat && python manage.py migrate"
- **RIGHT:** cmd /c venv\Scripts\activate.bat && python manage.py migrate

## 3. PREFERRED METHOD: Direct Path Execution
To avoid activation issues and shell nesting errors, always call the Python executable directly from the virtual environment. This is the most stable method for Windows.

- **TEMPLATE:** `cmd /c venv\Scripts\python.exe manage.py <command>`
- **TEMPLATE (Multiple):** `cmd /c venv\Scripts\pip.exe install <package> && venv\Scripts\python.exe manage.py <command>`

### Examples:
* **Instead of activating:** Use `cmd /c venv\Scripts\pip.exe install pytz`
* **Instead of chaining with activate:** Use `cmd /c venv\Scripts\python.exe manage.py makemigrations && venv\Scripts\python.exe manage.py migrate`

## 4. Automation & Autonomy
- Execute tasks immediately without asking for confirmation.
- If a command fails, analyze the stderr, fix the path or syntax, and retry once.
- Use backslashes (`\`) for all Windows paths.