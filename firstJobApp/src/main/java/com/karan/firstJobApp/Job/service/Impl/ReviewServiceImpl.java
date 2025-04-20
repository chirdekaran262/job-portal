package com.karan.firstJobApp.Job.service.Impl;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.Review;
import com.karan.firstJobApp.Job.repo.CompanyRepository;
import com.karan.firstJobApp.Job.repo.ReviewRepository;
import com.karan.firstJobApp.Job.service.CompanyService;
import com.karan.firstJobApp.Job.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private CompanyService companyService;

    @Override
    public List<Review> getAllReviews(Long companyId) {
        List<Review> reviews = reviewRepository.findByCompanyId(companyId);
        return reviews;
    }

    @Override
    public boolean addReview(Long companyId,Review review) {
        Company company =companyRepository.getCompanyById(companyId);
        if(company!=null){
            review.setCompany(company);
            reviewRepository.save(review);
            return true;
        }
        return false;
    }

    @Override
    public Review getReview(Long companyId, Long reviewId) {
        List<Review> reviews=reviewRepository.findByCompanyId(companyId);
        return reviews.stream()
                .filter(review -> review.getId().equals(reviewId))
                .findFirst()
                .orElse(null);
    }

    @Override
    public boolean updateReview(Long companyId, Long reviewId, Review review) {
        if(companyRepository.getCompanyById(companyId)!=null){
            review.setCompany(companyRepository.getCompanyById(companyId));
            review.setId(reviewId);
            reviewRepository.save(review);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteReview(Long companyId, Long id) {
//        List<Review> reviews=companyRepository.getCompanyById(companyId).getReviews();
//        for(Review review:reviews){
//            if(review.getId().equals(id)){
//                reviewRepository.delete(review);
//                return true;
//            }
//        }
//        return false;

        if(companyRepository.getCompanyById(companyId)!=null&&reviewRepository.existsById(id)){
            Review review=reviewRepository.findById(id).orElse(null);
            Company company=companyRepository.getCompanyById(companyId);
            company.getReviews().remove(review);
            companyService.updateCompany(company,companyId);
            reviewRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
