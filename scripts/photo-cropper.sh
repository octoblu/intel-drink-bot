for file in *; echo "convert $file -crop 1100x1100+900+1100 $file-cropped.jpg"; end



convert IMG_20160121_164316.jpg -crop 900x900+1000+1200 cropped/cropped.jpg
