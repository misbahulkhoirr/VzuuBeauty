import React from 'react'
import moment from 'moment'
import { ReviewListItem } from '../../molecules'

const ReviewList = ({ data }) =>
{
    return (
        <>
            {data && data.map((item, index) => (
                <ReviewListItem
                    reviewer={item.customer_name}
                    reviewerPhoto={item.reviewerPhoto}
                    review={item.review}
                    reviewPoint={item.ratings}
                    reviewPhotos={item.review_images}
                    time={moment(item.created_at).format(
                        'DD MMMM YYYY'
                    )}
                    key={index}
                />
            ))}
        </>
    )
}

export default ReviewList