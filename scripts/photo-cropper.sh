#crop faces
for file in *; convert $file -crop 900x900+1000+1200 cropped/$file; end
