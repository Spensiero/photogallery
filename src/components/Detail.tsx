import React, { Component } from 'react'

export default class Detail extends Component<any> {
    constructor(props: any){
        super(props);
    }
    componentDidMount(){
        
    }
    render() {
        let dataDetail = this.props.location.search
        try{
            dataDetail = JSON.parse(dataDetail.substr(1, dataDetail.length + 1))
        }
        catch(error){
            console.log(error)
        }
        return (
            <div>
               {dataDetail.name ? dataDetail.name : ''}
            </div>
        )
    }
}
