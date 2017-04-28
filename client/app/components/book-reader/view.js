import React from 'react';
import config from 'config';
import turn from 'app/vendors/turn';
import $ from 'jquery';
import style from './style.scss';

export default class BookReader extends React.Component {
    shouldComponentUpdate() {
        return !this.bookPluginStarted;
    }

    componentWillMount() {
        this.bookPluginStarted = false;
    }

    componentDidMount() {
        this.$flipbook = $(this.refs.reader);

        if (this.props.ready && !this.bookPluginStarted) {
            this.$flipbook.turn({
                width: this.props.width,
                height: this.props.height,
                autoCenter: true
            });

            this.bookPluginStarted = true;
        }

        this.$flipbook.bind('turned', (event, page) => {
            this.props.setPage(page);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentPage !== nextProps.currentPage && this.bookPluginStarted) {
            this.$flipbook.turn('page', nextProps.currentPage);
        }
    }

    componentWillUnmount() {
        try {
            this.$flipbook.turn('destroy').bind(this.refs.reader);
        } catch (e) {}

    }

    render() {
        return (
            <div ref="zoomViewPort">
                <div ref="reader" className={ style.book }>
                    {
                        this.props.pages.map(page => {
                            return (
                                <div key={ page.url } className={ style.page }>
                                    <img src={ `${config.server.base}${page.url}` }/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

BookReader.defaultProps = {
    ready: false,
    pages: []
};
