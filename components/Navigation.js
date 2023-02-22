/* Next API */
import Link from 'next/link';

/* React API */
import { useState } from 'react';

/* Styles */
import styles from '../styles/components/Navigation.module.scss';

/* Components */
import Icon from './Icon';

/* Images */
import iconAppIndicator from '../public/icon-app-indicator.svg';
import iconPlusLg from '../public/icon-plus-lg.svg';
import iconHdd from '../public/icon-hdd.svg';
import iconXLg from '../public/icon-x-lg.svg';
export default function Navigation() {
  const menuElements = [
    {
      id: 0,
      name: 'Products',
      subRoutes: [
        {
          id: 0,
          name: 'List Products',
          icon: iconHdd,
          route: '/products/allProducts'
        },
        {
          id: 1,
          name: 'New Product',
          icon: iconPlusLg,
          route: '/products/newProduct'
        }
      ]
    },
    {
      id: 1,
      name: 'Shipments',
      subRoutes: [
        {
          id: 0,
          name: 'List Shipments',
          icon: iconHdd,
          route: '/shipments/allShipments'
        },
        {
          id: 1,
          name: 'New Shipment',
          icon: iconPlusLg,
          route: '/shipments/newShipment'
        }
      ]
    }
  ];

  const [isActive, setIsActive] = useState(false);

  const drawerHandler = async (event) => {
    event.preventDefault();
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={`${styles.left}`}></div>

      <div className={`${styles.right}`}>
        <div className={`${styles.drawer}`}>
          <div className={`${styles.button}`} onClick={drawerHandler}>
            <Icon
              src={iconAppIndicator}
              width={36}
              height={36}
              alt={'shipping'}
              quality={80}
            />
          </div>

          <div className={!isActive ? `` : `${styles.sidebar}`}>
            {isActive && (
              <div>
                <div className={`${styles.top}`}>
                  <span>Logged User</span>
                  <div className={`${styles.button}`} onClick={drawerHandler}>
                    <Icon
                      src={iconXLg}
                      width={36}
                      height={36}
                      alt={'shipping'}
                      quality={80}
                    />
                  </div>
                </div>
                <div className={`${styles.content}`}>
                  {menuElements.map((element) => (
                    <div className={`${styles.group}`} key={element.id}>
                      <span className={`${styles.header}`}>{element.name}</span>
                      <div>
                        {element.subRoutes.map((subItem) => (
                          <div
                            className={`${styles.link}`}
                            onClick={drawerHandler}
                            key={subItem.id}
                          >
                            <Link href={subItem.route}>
                              <Icon
                                src={subItem.icon}
                                width={18}
                                height={18}
                                alt={'shipping'}
                                quality={80}
                              />
                              <span>{subItem.name}</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
