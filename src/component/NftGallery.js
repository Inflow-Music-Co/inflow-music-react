import { useState } from 'react'
import { Carousel } from 'react-bootstrap'

const NftGallery = ({ artist }) => {
    const [info, setInfo] = useState()

    return (
        <Carousel variant="dark">
            {artist.nft_collection && artist.nft_collection.map((nft, index) => {
                if(nft.img_url !== null){
                    return (
                        <Carousel.Item key={index} variant="dark">
                            <img
                            className="d-block w-100"
                            src={`${nft.img_url}`}
                            alt={`${nft.token_address}`}
                            />
                            <Carousel.Caption>
                                <h5 style={{color: 'black'}}>{nft.name}</h5>
                                <h5 style={{color: 'black'}}>ID {nft.token_id}</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                } 
            })}
        </Carousel>
    )
}

export default NftGallery
