@echo off
setlocal enabledelayedexpansion

set "target_folder=%~1"

if not defined target_folder (
    set "target_folder=%CD%"
) else (
    set "target_folder=%~1"
)

set "output_file=%target_folder%\output.txt"

if exist "%output_file%" del "%output_file%"

for /r "%target_folder%" %%f in (*.jpg;*.jpeg;*.png;*.gif;*.bmp;*.webp;*.tiff;*.svg;*.mp4;*.mkv;*.avi;*.mov;*.wmv) do (
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

    REM Identify whether the file is an image or a video
    echo %%~xf | findstr /I /C:".jpg" /C:".jpeg" /C:".png" /C:".gif" /C:".bmp" /C:".webp" /C:".tiff" /C:".svg" >nul 2>&1
    if not errorlevel 1 (
        for /f "tokens=1,2 delims= " %%a in ('magick identify -format "%%w %%h" "%%f"') do (
            echo   !filename!: {>> "%output_file%"
            echo     name: "!filename!",>> "%output_file%"
            echo     src: "!fullpath!",>> "%output_file%"
            echo     alt: "",>> "%output_file%"
            echo     width: %%a,>> "%output_file%"
            echo     height: %%b,>> "%output_file%"
            echo   },>> "%output_file%"
        )
    ) else (
        for /f "tokens=1,2 delims=," %%a in ('ffprobe -v error -show_entries stream^=width^,height -of csv^=p^=0 "%%f"') do (
            echo   !filename!: {>> "%output_file%"
            echo     name: "!filename!",>> "%output_file%"
            echo     src: "!fullpath!",>> "%output_file%"
            echo     alt: "",>> "%output_file%"
            echo     width: %%a,>> "%output_file%"
            echo     height: %%b,>> "%output_file%"
            echo   },>> "%output_file%"
        )
    )
)

echo Process completed.
