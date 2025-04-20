package com.karan.firstJobApp.Job.controller;


import com.karan.firstJobApp.Job.model.Review;
import com.karan.firstJobApp.Job.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company/{companyId}")
@CrossOrigin(origins = "http://localhost:3000/*")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews(@PathVariable Long companyId) {
        List<Review> reviews = reviewService.getAllReviews(companyId);
        if (reviews == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reviews,HttpStatus.OK);
    }

    @PostMapping("/reviews")
    public ResponseEntity<String> createReview(@PathVariable Long companyId,@RequestBody Review review) {
        Boolean isReviewAdded = reviewService.addReview(companyId,review);
        if(isReviewAdded){
            return new ResponseEntity<>("Review added",HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Review not added",HttpStatus.NOT_FOUND);
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<Review> getAllReviewsByCompanyId(@PathVariable Long companyId, @PathVariable Long id) {
        return new ResponseEntity<>(reviewService.getReview(companyId,id),HttpStatus.OK);
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<String> updateReview(@PathVariable Long companyId,@PathVariable Long id, @RequestBody Review review) {
        boolean isReviewUpdated = reviewService.updateReview(companyId,id,review);
        if(isReviewUpdated){
            return new ResponseEntity<>("Review updated",HttpStatus.OK);
        }
        return new ResponseEntity<>("Review not updated",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long companyId,@PathVariable Long id) {
        boolean isReviewDeleted=reviewService.deleteReview(companyId,id);
        if(isReviewDeleted){
            return new ResponseEntity<>("Review deleted",HttpStatus.OK);
        }
        return new ResponseEntity<>("Review not deleted",HttpStatus.NOT_FOUND);
    }

}
