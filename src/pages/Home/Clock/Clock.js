import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';

import styles from './Clock.module.scss';
import { clear } from '@testing-library/user-event/dist/clear';

const cx = classNames.bind(styles);

function Clock() {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;

    const CountDown = () => {
        const destination = new Date('November 12, 2022').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();

            const different = destination - now;
            const days = Math.floor(different / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            const minutes = Math.floor(
                (different % (1000 * 60 * 60)) / (1000 * 60),
            );
            const seconds = Math.floor((different % (1000 * 60)) / 1000);

            if (destination < 0) {
                clearInterval(interval.current);
            } else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        });
    };
    // nếu cho [] thì nó sẽ chạy đến âm vì nó chỉ chạy 1 lần duy nhất dù giây phút giờ  thay đổi
    // còn bỏ đi [] thì khi chạy xong nó sẽ chạy điều kiện destination khi < 0
    useEffect(() => {
        CountDown();
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('data')}>
                <div className="content">
                    <h1>{days}</h1>
                    <h5>Days</h5>
                </div>
                <span>:</span>
            </div>

            <div className={cx('data')}>
                <div className="content">
                    <h1>{hours}</h1>
                    <h5>Hours</h5>
                </div>
                <span>:</span>
            </div>

            <div className={cx('data')}>
                <div className="content">
                    <h1>{minutes}</h1>
                    <h5>Minutes</h5>
                </div>
                <span>:</span>
            </div>

            <div className={cx('data')}>
                <div className="content">
                    <h1>{seconds}</h1>
                    <h5>Seconds</h5>
                </div>
            </div>
        </div>
    );
}

export default Clock;
