#Configuration

#Carte SD
Télécharger l'image de debian pour l'A20 [ici](https://drive.google.com/file/d/0B-bAEPML8fwlOWVVcUxnSTE4YTg/edit)
Décompresser l'image (7zip) avec par exemple p7zip sous linux ou winrar sous windows

Insérer la carte SD
Ecrire l'image sur la carte:
	- Windows avec [Win32 Disk Imager](http://sourceforge.net/projects/win32diskimager/)
		Sélectionner l'image, la carte et write.
	- Linux :
		Avec sdX la carte sd
		
		Démonter la carte : 
			**umount /dev/sdX**
		Ecrire l'image :
			_dd bs=4M oflag=sync if=nom_de_l_image.img of=/dev/sdX_
		Redimensionner au besoin avec gparted
