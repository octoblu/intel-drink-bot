#crop faces
for file in *; convert $file -crop 900x900+1000+1200 cropped/$file; end

#trim whitespace
for file in *; convert $file -fuzz 40% -trim trimmed/$file; end


#clear background
for file in *; convert $file -fuzz 11% -transparent "rgb(172,170,158)" transparent/$file; end

#8-bit
for file in *; convert $file -depth 3 PNG8:contrast.png 8-bit/$file; end

#lighten
for file in *; convert $file -level 0%,100%,1.3 lighten/$file; end

#file extensions
rename 's/\.jpg\.png$/\.png/' *.png
