import React,{useState} from 'react'
import { Image, Pressable, StyleSheet, View, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { DefaultAvatar, ImagePlaceholder } from '../../../assets'
import { BUCKET_URL, colors, fonts } from '../../../utils'
import { Gap, IconStar, Text } from '../../atoms'

const ReviewListItem = ({ reviewer, reviewerPhoto, review, reviewPoint, reviewPhotos, time }) =>
{
    const [visible, setVisible] = useState(false)
    const [image, setImage] = useState()
    const stars = []

    if(reviewPoint)
    {
        const inactiveStar = 5 - reviewPoint

        for(let i = 0; i < reviewPoint; i++) stars.push('active')

        if(inactiveStar > 0)
        {
            for(let i = 0; i < inactiveStar; i++) stars.push('inactive')
        }
    }

    const onClickImage = (item) => {
        console.log('item',item)
        const image = []
        item &&
            item.map(imageitem => {
                image.push({ url: `${BUCKET_URL}/${imageitem.image}` })
            })
        setImage(image)
        setVisible(true)
    }

    const onSwipeDown = () => {
        setVisible(false)
    }
    return (
        <>
        <View style={styles.container}>
            <View style={styles.reviewPointWrapper}>
                {stars.map((item, index) => (
                    item === 'active'
                    ? <IconStar size={15} filled color="#FFEB3B" key={index} />
                    : <IconStar size={15} filled color="#dedede" key={index} />
                ))}
                <Gap width={5} />
                <Text style={styles.time}>&middot;</Text>
                <Gap width={5} />
                <Text style={styles.time}>{time} lalu</Text>
            </View>
            <View style={styles.reviewerWrapper}>
                <Image
                    style={styles.photo}
                    source={reviewerPhoto ? { uri: `${BUCKET_URL}/${reviewerPhoto}` } : DefaultAvatar}
                />
                <Text style={styles.reviewer}>{reviewer}</Text>
            </View>
            <Text style={styles.review}>{review}</Text>
            {reviewPhotos &&
                <View style={styles.reviewPhotosWrapper}>
                    {reviewPhotos.map((item, index) => (
                        <Pressable
                            onPress={() => onClickImage(reviewPhotos)}
                            key={index}
                        >
                            <Image
                                style={styles.reviewPhotos}
                                source={item.image ? { uri: `${BUCKET_URL}/${item.image}` } : ImagePlaceholder}
                            />
                        </Pressable>
                    ))}
                </View>
            }
        </View>

        {visible === true && (
                <Modal visible={true} transparent={true}>
                    <ImageViewer
                        onCancel={() => {
                            onSwipeDown()
                        }}
                        enableSwipeDown={true}
                        imageUrls={image}
                    />
                </Modal>
            )}
        </>
    )
}

export default ReviewListItem

const styles = StyleSheet.create({
    container:
    {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    reviewPointWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    reviewerWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    photo:
    {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        marginRight: 5
    },
    reviewer:
    {
        color: '#555555',
        fontFamily: fonts.primary[500],
        fontSize: 14
    },
    time:
    {
        fontFamily: fonts.primary[400],
        fontSize: 14
    },
    review:
    {
        fontSize: 12,
        lineHeight: 16
    },
    reviewPhotosWrapper:
    {
        flexDirection: 'row',
        marginTop: 10
    },
    reviewPhotos:
    {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 5
    }
})