import React from 'react';
import { CardTypes } from '../../../types/cardTypes';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import amex from '../../../assets/images/amex.png';
import discover from '../../../assets/images/discover.png';
import diners from '../../../assets/images/diners.png';
import { CardTypeProps } from './types';
import { CardTypeImage, Container } from './styles';

export const CardType = ({ cardType }: CardTypeProps) => {
  const images = {
    [CardTypes.Visa]: visa,
    [CardTypes.MasterCard]: mastercard,
    [CardTypes.AmericanExpress]: amex,
    [CardTypes.Discover]: discover,
    [CardTypes.DinersClub]: diners,
  };

  return (
    <Container>
      {cardType === null ? (
        Object.values(images).map((image, index) => <CardTypeImage key={index} source={image} />)
      ) : (
        <CardTypeImage source={images[cardType]} />
      )}
    </Container>
  );
};
