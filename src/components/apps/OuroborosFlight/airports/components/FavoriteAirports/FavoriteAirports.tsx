import React from 'react'
import './FavoriteAirports.scss'

type T_AirportsFavoritesProps = {
  favorites: string[]
}

export const AirportsFavorites: React.FC<T_AirportsFavoritesProps> = (props: T_AirportsFavoritesProps): JSX.Element => {
  const getFavorites = (): string[] => {
    if (props.favorites.length > 0) return props.favorites
    else return ['No favorites selected']
  }
  return (
    <div className="airports-favorites">
      <div className="airports-favorites-title">Favorites</div>
      <div className="airports-favorites-list">
        {getFavorites().map((airport: string, key: number) => {
          return (
            <div key={key} className="airports-favorites-list-item">
              {airport}
            </div>
          )
        })}
      </div>
    </div>
  )
}
