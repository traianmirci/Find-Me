import React from 'react';
import Link from '../components/Link';
import Links from '../links';
import { Container, Tabs, Tab } from 'react-bootstrap';

function Profile() {
  return (
    <div class='profile-page'>
      <div className='profile-image d-flex pb-3'>
        <img
          className='rounded-circle mx-auto'
          src='https://avatars1.githubusercontent.com/u/25345045?s=460&u=ce388cd9c959128460483c392d51ffa097cd917d&v=4'
          alt=''
          srcset=''
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
            {Links.map((link) => (
              <Link link={link} />
            ))}
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
