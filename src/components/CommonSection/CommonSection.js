import classNames from 'classnames/bind';
import styles from './CommonSection.module.scss';

const cx = classNames.bind(styles);

function CommonSection({ title }) {
    return (
        <div className={cx('common__section')}>
            <div className={cx('common__inner')}>
                <h1>{title}</h1>
            </div>
        </div>
    );
}

export default CommonSection;
