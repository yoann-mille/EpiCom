#Configuration

#Carte µSD 6Gb minimum

Télécharger l'image de debian pour l'A20 [ici](https://drive.google.com/file/d/0B-bAEPML8fwlOWVVcUxnSTE4YTg/edit)

Décompresser l'image (7zip) avec par exemple p7zip sous linux ou winrar sous windows

Insérer la carte SD

Ecrire l'image sur la carte:

- Windows avec [Win32 Disk Imager](http://sourceforge.net/projects/win32diskimager/)

	Sélectionner l'image, la carte et write.

- Linux :

	Avec sdX la carte sd
	
	- Démonter la carte :
	
			*umount /dev/sdX*
	
	- Ecrire l'image :
	
			*$>dd bs=4M oflag=sync if=nom_de_l_image.img of=/dev/sdX*
	
	- Redimensionner au besoin [video](https://www.youtube.com/watch?v=R4VovMDnsIE)
		
			*$>fdisk -uc /dev/sdX*

				*Welcome to fdisk (util-linux 2.23.2).*
					
				*Changes will remain in memory only, until you decide to write them.*
				*Be careful before using the write command.*
					
				*Command (m for help): p*
					
				*Disk /dev/sdb: 7969 MB, 7969177600 bytes, 15564800 sectors*
				
				*Units = sectors of 1 * 512 = 512 bytes*
				
				*Sector size (logical/physical): 512 bytes / 512 bytes*
				
				*I/O size (minimum/optimal): 512 bytes / 512 bytes*
				
				*Disk label type: dos*
				
				*Disk identifier: 0x6f20736b*
					
				*Device Boot      Start         End      Blocks   Id  System*
				
				*/dev/sdb1            2048       34815       16384   83  Linux*
				
				*/dev/sdb2           34816    15564799     7764992   83  Linux*
					
				*Command (m for help): d*
	
				*Partition number : 2*
	
				*Command (m for help): n*
	
				*Partition number : 2*
	
				*First sector : 34816*
	
				*Last sector : taper entrer pour la taille max*
	
				*Command (m for help): w*

			*$>reboot*

			*$>resize2fs -p /dev/sdbX*
		
