import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { Rating } from 'react-native-ratings'
import { useDispatch, useSelector } from 'react-redux'
import { ImagePlaceholder } from '../../assets'
import { ButtonOpacity, Gap, IconCamera, Text, TextArea, TopbarHeader } from '../../components'
import { colors, fonts, showError, truncate, useForm, BUCKET_URL } from '../../utils'
import {
    createReviewAction
} from '../../redux/actions/v2'

const CreateProductReview = ({ navigation, route }) =>
{
    const dataReview = useSelector(state => state.createreviewReducer.data)
    const dispatch = useDispatch()
    const Product = route.params
    console.log('Response Review Data',dataReview)
    // console.log('ProductReview',Product)
    const [ form, setForm ] = useForm({
        product_id: route.params && route.params?.product_id,
        order_id: route.params && route.params?.order_id,
        rating: 5,
        review: 'keren',
    })

    const [product_id, setProduct_id] = useState(route.params && route.params?.product_id)
    const [order_id, setOrder_id] = useState(route.params && route.params?.order_id)
    const [rating, setRating] = useState(5)
    const [review, setReview] = useState("KerenBoss")
    
    const [ photoForDB, setPhotoForDB ] = useState('')
    const [ hasPhoto, setHasPhoto ] = useState(false)
    const [ photo, setPhoto ] = useState([])
    
    const PropsData = {
        product_id,
        order_id,
        rating,
        review,
        photo
    }
    console.log('State',PropsData)
    const getImage = () =>
    {
        const options = {
            includeBase64: true,
            quality: 0.5,
            maxWidth: 200,
            maxHeight: 200
        }
    
        launchImageLibrary(options, (response) =>
        {
            if(response.didCancel || response.error)
            {
                showError('Sepertinya Anda tidak memilih fotonya.')
            }
            else
            {
                const source = { uri: response.assets[0].uri }
                // console.log('response.assets[0]',response.assets[0])
                setPhotoForDB(`data:${response.assets[0].type};base64, ${response.assets[0].base64}`)
        
                setHasPhoto(true)
                response && response.assets.map(
                    imageItem => {
                        setPhoto(oldArray => [...oldArray, {uri: imageItem.uri}])
                    }
                )

            }
        })
    }   
    console.log('Photo',photo)
    const ratingCompleted = (rating) => {
        setRating(rating)
    }
      
    const submitReviewHandler = () =>
    {
        // alert('Ok')
        dispatch(createReviewAction(PropsData, navigation))
    }

    const productName = 'Nama Barang yang Mau di-Review'

    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Beri Ulasan"
                goBack={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <Gap height={15} />
                    <View style={styles.productWrapper}>
                        <Image source={route.params && route.params.image ? { uri: `${BUCKET_URL}/${route.params.image}`} : ImagePlaceholder} style={styles.image} />
                        <View>
                            <Text style={styles.productName}>{truncate(route.params && route.params.product_name, 35)}</Text>
                            <Text style={styles.itemCount}>
                                {route.params && route.params.qty} barang
                            </Text>
                        </View>
                    </View>
                    <Rating
                        onFinishRating={ratingCompleted}
                        startingValue={5}
                        minValue={1}
                        style={styles.rating}
                    />
                    <Text style={styles.label}>Penilaian dan masukanmu akan membantu pembeli lain</Text>
                    <TextArea defaultValue={review} onChangeText={value => setReview(value)} placeholder="Beri penilaianmu terhadap kualitas produk, masukan dan sebagainya." />
                    <Gap height={25} />
                    <TouchableOpacity
                        style={styles.imageUploadWrapper}
                        onPress={getImage}
                    >
                        {hasPhoto ?
                            <View style={styles.WrappingphotoReview}>
                                {photo.map((itemphoto, index) => (
                                    <Image key={index} source={itemphoto} style={styles.imageUpload} />
                                ))}
                            </View>
                            :
                            <View style={styles.placeholderWrapper}>
                                <IconCamera />
                                <Text style={styles.textPlaceholder}>
                                    Unggah foto agar ulasan lebih jelas
                                </Text>
                            </View>
                        }
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.bottomSection}>
                    <View style={styles.buttonWrapper}>
                        <ButtonOpacity
                            title="Kirim"
                            onPress={submitReviewHandler}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreateProductReview

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 15 },
    productWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    image:
    {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 5,
        marginRight: 10
    },
    productName:
    {
        fontSize: 14,
        lineHeight: 21
    },
    itemCount: { color: colors.text.placeholder },
    rating: { paddingBottom: 25 },
    label:
    {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 15,
        marginBottom: 5
    },
    imageUploadWrapper:
    {
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center'
    },
    imageUpload:
    {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        borderRadius: 5,
        marginRight: 10,
    },
    placeholderWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    textPlaceholder:
    {
        color: colors.text.placeholder,
        marginLeft: 10
    },
    bottomSection:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        padding: 15
    },
    buttonWrapper: { width: 150 },
    WrappingphotoReview: {
        flexDirection:'row',
    }
})
