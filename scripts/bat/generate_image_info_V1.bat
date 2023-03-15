@echo off
setlocal enabledelayedexpansion

set "target_folder=%~1"
set "output_file=%~2"

if not defined target_folder set /p target_folder="Enter the target folder: "
if not defined output_file set /p output_file="Enter the output file: "

if exist %output_file% del %output_file%

for /r "%target_folder%" %%f in (*.jpg;*.jpeg;*.png;*.gif;*.bmp;*.webp;*.tiff) do (
    set "filename=%%~nf"
    set "fullpath=%%~dpnxf"
    set "fullpath=!fullpath:\=/!"
    
    REM Check if the '/portfolio/public/' exists in the string and modify the path accordingly
    echo !fullpath! | findstr /C:"/portfolio/public/" >nul 2>&1
    if not errorlevel 1 (
        for /f "tokens=1,* delims=/ " %%a in ("!fullpath:*portfolio/public/=!") do (
            set "fullpath=./assets/%%b"
        )
    )

    for /f "tokens=1,2 delims= " %%a in ('magick identify -format "%%w %%h" "%%f"') do (
        echo   !filename!: {>> %output_file%
        echo     name: "!filename!",>> %output_file%
        echo     src: "!fullpath!",>> %output_file%
        echo     alt: "",>> %output_file%
        echo     width: %%a,>> %output_file%
        echo     height: %%b,>> %output_file%
        echo   },>> %output_file%
    )
)

echo Process completed.
