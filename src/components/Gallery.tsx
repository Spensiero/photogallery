import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import './Gallery.scss';

interface State {
    dataImages: any;
    arrThumbs: any;
    scroll: boolean;
}

export default class Gallery extends Component<any,State> {
    constructor(props: any){
        super(props);
        this.state = {
            arrThumbs: [],
            dataImages: [],
            scroll: false 
        };
    }
      
    componentDidMount(){
        document.addEventListener("mousewheel", ()=>{
            this.getDataImages()
            this.setScrollActive()
        })
        this.getFirstDataImages()
    }

    componentWillUnmount(){
        document.addEventListener("mousewheel", ()=>{})
    }

    getFirstDataImages(){
        axios.get('https://www.reddit.com/r/Pics/top.json')
        .then((response) => {
            this.setState(() => ({
                dataImages: response.data.data.children
            }),()=>{
                this.setGalleryContent()
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
                dataImages: arrPicturesObj
              }),()=>{
                _this.setGalleryContent()
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
            if(item.data.thumbnail && item.data.thumbnail.search("https") == 0)
            arrPictures.push(<li key={key}><Link to={"/detail?"+ data}><img src={item.data.thumbnail}/></Link></li>) 
        }
       
        this.setState({
            arrThumbs: arrPictures
        });
    }

    getThumbs(){
        if(this.state.arrThumbs.length > 0)
        return this.state.arrThumbs.map((item: any) => item);
    }
    
    render() {
        return (
            <div style={{height:  this.state.scroll ? '100%' : window.innerHeight, overflowY: this.state.scroll ? 'inherit' : 'hidden'}}>
                <ul>
                    {this.getThumbs()}
                </ul>
            </div>
        )
    }
}
