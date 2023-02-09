import React from 'react';
import classNames from 'classnames';

function Helmet({ title, children }) {
    document.title = 'Trung Hiếu - ' + title;
    return <div className={classNames('wrapper')}>{children}</div>;
}

export default Helmet;
