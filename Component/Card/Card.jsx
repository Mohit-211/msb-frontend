import React from 'react'
import styles from './Card.module.scss'
import { Button } from 'react-bootstrap'
import { Divider, Typography } from '@mui/material'
import { Done } from '@mui/icons-material'
const Card = () => {
    const data = [
        { features : "All features in Basic" },
        { features : "Flexible Call Schedulling" },
        { features : "15 TB cloud storage" },
    ]
  return (
    <div className={styles.cardContainer}>
        <Typography textAlign='center' variant='h4' className=''>Startup $24</Typography>
        <Divider className={styles.divider}></Divider>
        <div>
            {data.map((item) =>(
                <div className={styles.listContainer}>
            <Done sx={{mr:2}}/>
        <Typography className={styles.list}>{item.features}</Typography>
                </div>
                ))}
        </div>
        <Button className={styles.planeButton}>Choose Plan {"=>"}</Button>
    </div>
  )
}

export default Card