import React, { Component } from 'react'
import axios from 'axios';  //this is just testing with the firebase server
import Grid from '@material-ui/core/Grid';

import Melody from '../components/Melody';

class home extends Component {
    state = {
        melodies: null
    }
    componentDidMount(){    //this is connected to the firebase database for now
        axios.get('/Melodies')
        .then(res => {
            this.setState({
                melodies: res.data
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        let recentMelodiesMarkup = this.state.melodies ? (
            this.state.melodies.map((melody) => <Melody key={melody.melodyId} melody={melody}/>)
        ) : <p>Loading...</p>
        return (
            <Grid container>
                <Grid item sm={3} xs={12}>
                    <p>Friends...</p>
                </Grid>
                <Grid item sm={6} xs={12}>
                    {recentMelodiesMarkup}
                </Grid>
                <Grid item sm={3} xs={12}>
                    <p>Search...</p>
                </Grid>
            </Grid>
        );
    }
}

export default home
