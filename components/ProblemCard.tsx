import React from 'react'
import { Problem } from '../data/problems'
import styles from '../styles/ProblemCard.module.sass'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Highlight, { defaultProps } from "prism-react-renderer";

type Props = {
    problem: Problem
}

type BadgeProps = {
    type: string
}

const Badge = ({ type }: BadgeProps) => (
    <div className={styles.card__badge}>{type}</div>
)

const ProblemCard = ({ problem }: Props) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styles.card}>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className={styles.solution__container}>
                    <div className={styles.solution}>
                        <Highlight {...defaultProps} code={problem.solution} language="jsx">
                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre className={`${styles.solution} ${className}`} style={style}>
                                    {tokens.map((line, i) => (
                                        <div {...getLineProps({ line, key: i })}>
                                            {line.map((token, key) => (
                                                <span {...getTokenProps({ token, key })} />
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    </div>
                </Box>
            </Modal>
            <div className={styles.card__badge__container}>
                {problem.type.map((t, i) => <Badge key={i} type={t} />)}
            </div>
            <div className={styles.card__problem}>
                <span className={styles.card__name__id}>
                    {problem.id}
                </span>
                <span className={styles.card__name}>
                    {problem.name}
                </span>
            </div>
            <div className={styles.card__btn}>
                <button className={styles['card__btn--main']} onClick={handleOpen}>View my solution</button>
                <button className={styles['card__btn--secondary']}><a href={problem.link} target='_blank'>View it on Leetcode
                </a></button>
            </div>
        </div>
    )
}

export default ProblemCard