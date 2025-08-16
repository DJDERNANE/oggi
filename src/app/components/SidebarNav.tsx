'use client';
import Link from 'next/link';
import useLogout from '@/hooks/useLogout'; // adjust the path to your hook

export default function SidebarNav() {
    const logout = useLogout();

    const topNav = [
        { id: 1, name: 'Accueil', link: '/dashboard', icon: '/home.svg' },
        { id: 2, name: 'Mes Visas', link: '/my-visas', icon: '/calendar.svg' },
        { id: 3, name: 'Documents', link: '/my-docs', icon: '/folder.svg' },
    ];

    const bottomNav = [
        // { id: 4, name: 'Corbeille', link: '/', icon: '/trash.svg' },
        { id: 5, name: 'Paramètres', link: '/settings', icon: '/settings.svg' },
        { id: 6, name: 'Déconnecter', action: logout, icon: '/Logout.svg' }, // no `link`, use `action`
    ];

    return (
        <div className="sidebar-nav">
            <div>
                {topNav.map((item) => (
                    <Link href={item.link} key={item.id} className="sidebar-nav-item">
                        <img src={item.icon} alt={item.name} />
                        <span className="ml-2">{item.name}</span>
                    </Link>
                ))}
            </div>
            <div>
                {bottomNav.map((item) =>
                    item.action ? (
                        <button
                            key={item.id}
                            onClick={item.action}
                            className="sidebar-nav-item flex items-center w-full text-left"
                        >
                            <img src={item.icon} alt={item.name} />
                            <span className="ml-2">{item.name}</span>
                        </button>
                    ) : (
                        <Link href={item.link} key={item.id} className="sidebar-nav-item">
                            <img src={item.icon} alt={item.name} />
                            <span className="ml-2">{item.name}</span>
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
