import React from 'react';
import { Popup } from 'semantic-ui-react';

export default ({ content, children }) => (
  <Popup inverted content={content} trigger={children} />
);
