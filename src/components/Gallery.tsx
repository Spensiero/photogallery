import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"
import './Gallery.scss';

interface State {
    dataImages: any;
    dataImagesRecovery: any;
    arrThumbs: any;
    scroll: boolean;
    noImagesFound: boolean;
}

export default class Gallery extends Component<any,State> {
    constructor(props: any){
        super(props);
        this.state = {
            arrThumbs: [],
            dataImages: [],
            dataImagesRecovery: [],
            scroll: false,
            noImagesFound: false 
        };
        this.onMouseWheel = this.onMouseWheel.bind(this)
    }
      
    componentDidMount(){
        document.addEventListener("mousewheel", this.onMouseWheel, true)
        this.getFirstDataImages()
    }

    componentWillUnmount(){
        document.removeEventListener("mousewheel",this.onMouseWheel, true)
    }

    onMouseWheel(){
        this.getDataImages()
        this.setScrollActive()
        document.removeEventListener("mousewheel", this.onMouseWheel, true)
    }

    getFirstDataImages(){
        const _this = this
        Promise.all([this.getPictureObjOne(), this.getPictureObjTwo()])
          .then(function (results) {
            const first = results[0].data.data.children;
            const second = results[1].data.data.children;
            const arrPicturesObj = first.concat(second)
            _this.setState(() => ({
              dataImages: arrPicturesObj,
              dataImagesRecovery: arrPicturesObj
            }),()=>{
              _this.setGalleryContent()
            });
          })
          .catch((e)=>{
              console.log(e)
          })
    }

    setScrollActive(){
        this.setState({
            scroll: true
        })
    }

    getPictureObjOne() {
        return axios.get('https://www.reddit.com/r/Pics/top.json');
    }
      
    getPictureObjTwo() {
        return axios.get('https://www.reddit.com/r/woodworking/top.json');
    }

    getPictureObjTree() {
        return axios.get('https://www.reddit.com/r/batman/top.json');
    }

    getPictureObjFour() {
        return axios.get('https://www.reddit.com/r/StarWars/top.json');
    }

    getPictureObjFive() {
        return axios.get('https://www.reddit.com/r/london/top.json');
    }

    getDataImages(){
          const _this = this
          Promise.all([this.getPictureObjOne(), this.getPictureObjTwo(), this.getPictureObjTree(), this.getPictureObjFour(), this.getPictureObjFive()])
            .then(function (results) {
              const first = results[0].data.data.children;
              const second = results[1].data.data.children;
              const third = results[2].data.data.children;
              const fourth = results[3].data.data.children;
              const fifth = results[4].data.data.children;
              const arrPicturesObj = first.concat(second,third,fourth,fifth)
              _this.setState(() => ({
                dataImages: arrPicturesObj,
                dataImagesRecovery: arrPicturesObj 
              }),()=>{
                _this.filter(null)  
              });
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    setGalleryContent(){
        let arrPictures = []
        let key = 0
        for (let item of  this.state.dataImages) {
            key = key + 1
            const data = JSON.stringify(item.data)
            if(item.data.thumbnail && item.data.thumbnail.search("https") === 0)
            arrPictures.push(<li key={key}><Link to={"/detail?"+ data}><img src={item.data.thumbnail}/></Link></li>) 
        }
       
        this.setState({
            arrThumbs: arrPictures
        });
    }

    getThumbs(){
        return this.state.arrThumbs.map((item: any) => item);
    }

    filter(e: any){
        const inputValue = document.getElementById('search')
        const wordFiltered = e ? e.target : inputValue
        if(wordFiltered.value !== ''){
            let filteredDataImages =  this.state.dataImagesRecovery.filter((item: any)=>{
                return item.data.title.includes(wordFiltered.value); 
            });
            this.setState({
                dataImages: filteredDataImages,
                noImagesFound: filteredDataImages.length > 0 ? false : true
            },()=>{
                this.setGalleryContent()
            })
        } else {
            this.setState({
                dataImages: this.state.dataImagesRecovery
            },()=>{
                this.setGalleryContent()
            })
        }
    }
    
    render() {
        return (
            <div style={{height:  this.state.scroll ? '100%' : window.innerHeight, overflowY: this.state.scroll ? 'inherit' : 'hidden'}}>
                <div>
                    <input id='search' type='text' placeholder='Search' onChange={(e)=> this.filter(e)}/>
                    <svg style={{width: '20px', height: '20px', position: 'relative', top: '6px', left: '-33px', fill: "#282c34"}} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                </div>
                <ul>
                    {this.getThumbs()}
                </ul>
                {this.state.noImagesFound ? 
                    <p style={{margin: "50px auto"}}>No images found</p> 
                :   <ClipLoader css={"margin-top: 30px"} color={"withe"} loading={(this.state.arrThumbs.length > 0) ? false : true} size={40} />}
            </div>
        )
    }
}
