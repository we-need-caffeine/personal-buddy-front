import React from 'react';
import EventBannerContainer from './banner/EventBannerContainer';
import EventPostListContainer from './postList/EventPostListContainer';
import ScrollToTop from '../../../hooks/scrollToTop/ScrollToTop';

const EventContainer = () => {
    return (
        <div>
          <EventBannerContainer />
          <EventPostListContainer />
          <ScrollToTop />
        </div>
      );
};

export default EventContainer;