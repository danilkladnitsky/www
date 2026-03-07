import Link from 'next/link'

const navigation = [
  { href: '/', label: 'Блог' },
  { href: 'https://kladnitsky.ru', label: 'Обо мне' },
]

export const Header = () => {
  return (
    <header
      className="py-4 px-6 max-w-4xl mx-auto mt-4"
      role="banner"
    >
      <Link
        href="/"
        aria-label="Данил Кладницкий — на главную"
      >
        <h2 className='text-l font-bold'>Данил Кладницкий</h2>
      </Link>
      <nav aria-label="Основная навигация">
        <ul className='flex gap-2'>
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className='text-muted text-sm'
                aria-label={item.label}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
