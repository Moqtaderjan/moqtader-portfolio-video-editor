# Upgrade steps
1. Copy these files over your project (same paths): index.html, assets/css/styles.css, assets/js/main.js, assets/logos/*, assets/og/og-image.svg.
2. Keep your existing assets/js/data.js and assets/videos/ untouched.
3. In data.js fix the lf-02 video path (a space instead of underscore):
   "assets/videos/Life_Without Social_Media.mp4"  ->  "assets/videos/Life_Without_Social_Media.mp4"
4. Speed: compress each video (keeps quality, cuts size ~70%):
   ffmpeg -i in.mp4 -vf "scale=-2:1280" -c:v libx264 -crf 26 -preset slow -movflags +faststart -c:a aac -b:a 96k out.mp4
