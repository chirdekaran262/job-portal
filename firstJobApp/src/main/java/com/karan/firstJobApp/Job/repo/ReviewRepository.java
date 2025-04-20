package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review getReviewById(Long id);

    List<Review> findByCompanyId(Long companyId);


}
