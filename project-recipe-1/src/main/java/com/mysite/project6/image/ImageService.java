package com.mysite.project6.image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.mysite.project6.recipe.Recipe;

@Service
@Transactional
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image saveImage(String imagePath, Recipe recipe) {
        Image image = new Image(imagePath, recipe);
        return imageRepository.save(image);
    }

    public List<Image> saveImages(List<MultipartFile> files, Recipe recipe) {
        List<Image> savedImages = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                String fileName = generateUniqueFileName(file.getOriginalFilename());
                String imagePath = saveFileToLocalDirectory(file, fileName);
                Image image = new Image(imagePath, recipe);
                savedImages.add(imageRepository.save(image));
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to save images", e);
        }
        return savedImages;
    }
    
    private String generateUniqueFileName(String originalFileName) {
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        return UUID.randomUUID().toString() + extension;
    }

    private String saveFileToLocalDirectory(MultipartFile file, String fileName) throws IOException {
        String directoryPath = "C:\\juni\\respository\\image\\"; // 이미지가 저장될 디렉토리 경로
        Path filePath = Paths.get(directoryPath + fileName);
        Files.write(filePath, file.getBytes());
        return directoryPath + fileName;
    }
}