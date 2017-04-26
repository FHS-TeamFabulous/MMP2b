import React from 'react';
import { Grid } from 'react-bootstrap';
import Header from 'app/components/header';
import style from './style.scss';

export default function(props) {
    return (
        <div>
            <Grid>
                <div className={ style.head }>
                    <Header />
                </div>
            </Grid>
            <Grid className={style.content}>
                {props.children}
            </Grid>
        </div>
    );
}
