'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/ui/Search';
import { useUser } from '@/contexts/user';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import postLogout from '@/fetch/postLogout';
import { useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isTopPage, setIsTopPage] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isNavToggleActive, setIsNavToggleActive] = useState(false);
  const { storeUser } = useUser();
  const router = useRouter();

  const { loading, user } = useUser();

  const handleNavToggleClick = () => {
    setIsNavToggleActive((prev) => !prev);
  };

  const handleNavClose = () => {
    if (isNavToggleActive) {
      setIsNavToggleActive(false);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    const user = await postLogout();
    storeUser(null);

    if (user == null) {
      router.push('/');
    }
  };

  useEffect(() => {
    const isTopPage = pathname === '/';
    setIsTopPage(isTopPage);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <header
      className={clsx(
        'l-header',
        isTopPage && 'is-top header-scroll',
        isTopPage && scrollY > 100 && '-scrolled',
        isNavToggleActive && 'is-open',
      )}
    >
      <div className='l-header__inner'>
        <div className='l-header__logo'>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt='Company Name'
              width={166}
              height={50}
            />
          </Link>
        </div>
        <nav className='l-header__nav'>
          <button
            type='button'
            className='l-header__nav__toggle'
            onClick={handleNavToggleClick}
          >
            <div className='l-header__nav__toggle__icon'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className='l-header__nav__inner'>
            <ul className='l-header__nav__list' onClick={handleNavClose}>
              <li className='l-header__nav__list__item'>
                <Link href='/news'>ニュース</Link>
              </li>
            </ul>
            <Search onSubmit={handleNavClose} />
            {!loading && (
              <div onClickCapture={handleNavClose}>
                {user ? (
                  <div className='l-header__nav__options'>
                    {/* ログイン時 */}
                    <p className='is-sp c-text--small u-mt-0'>
                      ようこそ！{user.name1} さん
                    </p>
                    <Link
                      href='/member/mypage/'
                      className='l-header__nav__options__button c-button'
                    >
                      マイページ
                    </Link>
                    <button
                      type='button'
                      className='-logout l-header__nav__options__button u-display-flex u-display-flex-align-items-center'
                      onClick={handleLogout}
                    >
                      ログアウト
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6'
                          stroke='white'
                          strokeWidth='1.33333'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M10.6667 11.3333L14.0001 7.99996L10.6667 4.66663'
                          stroke='white'
                          strokeWidth='1.33333'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M14 8H6'
                          stroke='white'
                          strokeWidth='1.33333'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className='l-header__nav__options'></div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
