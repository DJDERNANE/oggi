
export default function SidebarNav() {
    const topNav = [
        {
            id: 1,
            name: 'Accueil',
            link: '/',
            icon: '/home.svg'
        },
        {
            id: 2,
            name: 'Réservations',
            link: '/',
            icon: '/calendar.svg'
        },
        {
            id: 3,
            name: 'Documents',
            link: '/',
            icon: '/folder.svg'
        },
    ]
    const bottomNav = [
        {
            id: 4,
            name: 'Corbeille',
            link: '/',
            icon: '/trash.svg'
        },
        {
            id: 5,
            name: 'Paramètres',
            link: '/',
            icon: '/settings.svg'
        },
        {
            id: 6,
            name: 'Se_Déconnecter',
            link: '/',
            icon: '/logout.svg'
        }

       

    ]
    return (
        <div className="sidebar-nav">
            <div>
                {topNav.map((item) => (
                    <div className="sidebar-nav-item" key={item.id}>
                        <img src={item.icon} alt={item.name} />
                        <a href={item.link}>{item.name}</a>
                    </div>
                ))}
            </div>
            <div>
                {bottomNav.map((item) => (
                    <div className="sidebar-nav-item" key={item.id}>
                        <img src={item.icon} alt={item.name} />
                        <a href={item.link}>{item.name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}