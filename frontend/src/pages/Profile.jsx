import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '../components/Link';
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import UserNotFound from './UserNotFound';
import { profile } from '../actions/profileActions';
import Message from '../components/Message';
import Loader from '../components/Loader.jsx';

function Profile({ match }) {
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile);
  const { loading, error, profileUser } = profileData;

  useEffect(() => {
    dispatch(profile());
  }, [match.params.id]);

  if (!true) {
    return <UserNotFound />;
  }

  return (
    <div className='profile-page'>
      <div className='profile-image d-flex pb-3'>
        <img
          className='rounded-circle mx-auto'
          src='https://avatars1.githubusercontent.com/u/25345045?s=460&u=ce388cd9c959128460483c392d51ffa097cd917d&v=4'
          alt=''
          srcSet=''
        />
      </div>
      <div className='description'>
        <div className='name text-center pb-3'>
          <h5>Traian Alexandru Mirci</h5>
        </div>
      </div>
      <div className="navigation pb-3'">
        <Tabs defaultActiveKey='links' className='justify-content-center'>
          <Tab eventKey='links' title='Links'>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : profileData.profile ? (
              profileData.profile.data.user.links.map((link) => (
                <Link link={link} />
              ))
            ) : (
              ''
            )}
          </Tab>
          <Tab eventKey='bio' title='Bio'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            dignissimos, non minima odit facere praesentium ullam voluptates
            asperiores. Ipsum necessitatibus reiciendis maiores nesciunt dolor
            numquam inventore dolorem. Ex, facere illo.
          </Tab>
          <Tab eventKey='contact' title='Contact'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            dignissimos, non minima odit facere praesentium ullam voluptates
            asperiores. Ipsum necessitatibus reiciendis maiores nesciunt dolor
            numquam inventore dolorem. Ex, facere illo.
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
