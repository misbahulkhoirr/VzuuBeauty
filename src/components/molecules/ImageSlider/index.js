import React, { useState } from 'react'
import { Image, StyleSheet, View, Modal, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ImagePlaceholder } from '../../../assets'
import { BUCKET_URL, colors, screenWidth } from '../../../utils'
import ImageViewer from 'react-native-image-zoom-viewer'

const ImageSlider = ({
    data,
    withoutItemKeyName,
    imageWrapperStyle,
    imageStyle,
    sliderWidth,
    itemWidth,
    autoplay,
    loop,
    visible,
    onClickImage,
    onSwipeDown,
    image
}) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const currSlideWidth = sliderWidth ? sliderWidth : screenWidth
    const currItemWidth = itemWidth ? itemWidth : screenWidth
    // console.log('data',data)

    return (
        <>
            <View>
                <Carousel
                    data={data instanceof Array ? data : []}
                    renderItem={({ item, index }) => (
                        <View
                            style={
                                imageWrapperStyle
                                    ? imageWrapperStyle
                                    : styles.imageWrapper
                            }
                            key={index}>
                            {withoutItemKeyName ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        onClickImage(data)
                                    }}>
                                    <Image
                                        source={
                                            item
                                                ? {
                                                      uri: `${BUCKET_URL}/${item.image}`
                                                  }
                                                : ImagePlaceholder
                                        }
                                        style={
                                            imageStyle
                                                ? imageStyle
                                                : styles.image
                                        }
                                    />
                                </TouchableOpacity>
                            ) : (
                                <Image
                                    source={
                                        item
                                            ? {
                                                  uri: `${BUCKET_URL}/${item.banner}`
                                              }
                                            : ImagePlaceholder
                                    }
                                    style={
                                        imageStyle ? imageStyle : styles.image
                                    }
                                />
                            )}
                        </View>
                    )}
                    sliderWidth={currSlideWidth}
                    itemWidth={currItemWidth}
                    onSnapToItem={index => setActiveSlide(index)}
                    autoplay={autoplay}
                    loop={loop}
                />
                <Pagination
                    dotsLength={data instanceof Array ? data.length : 0}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.slidePagination}
                    dotContainerStyle={styles.dotContainerStyle}
                    dotStyle={styles.dotStyle}
                    inactiveDotOpacity={0.5}
                    inactiveDotScale={1}
                />
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

export default ImageSlider

const styles = StyleSheet.create({
    imageWrapper: {
        height: 300,
        backgroundColor: colors.white
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    slidePagination: {
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    dotContainerStyle: { marginHorizontal: 3 },
    dotStyle: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: colors.primary
    }
})
