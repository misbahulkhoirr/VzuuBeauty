import React,{useEffect} from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TestImage1, TestImage2, TestImage3 } from '../../assets'
import { Gap, IconStar, ReviewList, Text, TopbarHeader } from '../../components'
import { colors, fonts } from '../../utils'
import {
    reviewAction
} from '../../redux/actions/v2'

const ProductReview = ({ navigation, route }) =>
{
    const product_id = route.params
    const dataReview = useSelector(state => state.reviewReducer.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reviewAction(product_id))
    },[])   
    const reviewListDummy = {
        totalReviewPoint: 4.8,
        data: [
            {
                id: 1,
                time: '2 bulan',
                reviewer: 'Maaya',
                reviewerPhoto: false,
                review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro saepe sequi repellat omnis eum magnam nemo explicabo voluptates, dignissimos beatae aliquam accusamus, illum aperiam exercitationem laborum. Eius dolor corrupti facere.',
                reviewPoint: 4,
                reviewPhotos: false
            },
            {
                id: 2,
                time: '5 bulan',
                reviewer: 'Marcus Aurelius',
                reviewerPhoto: false,
                review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro saepe sequi repellat omnis eum magnam nemo explicabo voluptates, dignissimos beatae aliquam accusamus, illum aperiam exercitationem laborum. Eius dolor corrupti facere.',
                reviewPoint: 5,
                reviewPhotos: [
                    {
                        id: 1,
                        image: TestImage1
                    },
                    {
                        id: 2,
                        image: TestImage2
                    },
                    {
                        id: 3,
                        image: TestImage3
                    }
                ]
            },
            {
                id: 3,
                time: '5 bulan',
                reviewer: 'Seneca',
                reviewerPhoto: false,
                review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro saepe sequi repellat omnis eum magnam nemo explicabo voluptates, dignissimos beatae aliquam accusamus, illum aperiam exercitationem laborum. Eius dolor corrupti facere.',
                reviewPoint: 4,
                reviewPhotos: false
            },
            {
                id: 4,
                time: '7 bulan',
                reviewer: 'Mirai',
                reviewerPhoto: false,
                review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro saepe sequi repellat omnis eum magnam nemo explicabo voluptates, dignissimos beatae aliquam accusamus, illum aperiam exercitationem laborum. Eius dolor corrupti facere.',
                reviewPoint: 5,
                reviewPhotos: [
                    {
                        id: 1,
                        image: false
                    },
                    {
                        id: 2,
                        image: TestImage2
                    },
                    {
                        id: 3,
                        image: TestImage3
                    }
                ]
            },
            {
                id: 5,
                time: '8 bulan',
                reviewer: 'Kanna',
                reviewerPhoto: false,
                review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro saepe sequi repellat omnis eum magnam nemo explicabo voluptates, dignissimos beatae aliquam accusamus, illum aperiam exercitationem laborum. Eius dolor corrupti facere.',
                reviewPoint: 5,
                reviewPhotos: false
            },
        ]
    }

    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Ulasan"
                goBack={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contentCenter}>
                        <View style={styles.pointBox}>
                            <View style={styles.totalReviewPointWrapper}>
                                <IconStar size={25} filled color="#FFEB3B" />
                                <Gap width={5} />
                                <Text style={styles.totalReviewPoint}>
                                    {reviewListDummy.totalReviewPoint}
                                </Text>
                                <Text>/5.0</Text>
                            </View>
                            <Gap height={10} />
                            <Text>Penilaian dari</Text>
                            <Text>{reviewListDummy.data.length} ulasan</Text>
                        </View>
                    </View>
                    <ReviewList
                        data={dataReview}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default ProductReview

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    contentCenter:
    {
        alignItems: 'center',
        backgroundColor: '#f8f8f8'
    },
    pointBox:
    {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    totalReviewPointWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#B3E5FC',
        borderRadius: 10,
        backgroundColor: 'rgba(225, 245, 254, 0.8)'
    },
    totalReviewPoint:
    {
        color: '#555555',
        fontFamily: fonts.primary[600],
        fontSize: 26,
    }
})