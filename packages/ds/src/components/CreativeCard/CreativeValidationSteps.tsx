import Hyperlink from '../Hyperlink/Hyperlink'
import { cx } from '../../utils/cx'
import styles from './CreativeValidationSteps.module.css'
import type { ValidationStep, ValidationStepType } from './types'

export interface CreativeValidationStepsProps {
  /** Passos em ordem cronológica crescente; o último é o estado atual. */
  steps: ValidationStep[]
}

/** Cor do ponto por tipo de passo — só o passo atual a usa; os demais ficam neutros. */
const DOT_CLASS: Record<ValidationStepType, string> = {
  added: styles.dotNeutral,
  analyzing: styles.dotWarning,
  rejected: styles.dotCritical,
  approved: styles.dotSuccess,
}

/**
 * Aba "Etapas de validação" do drawer de criativos.
 *
 * Linha do tempo do mais recente ao mais antigo. Só o passo atual recebe o ponto
 * colorido pela semântica; os anteriores ficam neutros.
 */
export default function CreativeValidationSteps({ steps }: CreativeValidationStepsProps) {
  // Mais recente no topo.
  const ordered = steps.slice().reverse()

  return (
    <ol className={styles.timeline}>
      {ordered.map((step, index) => {
        const isCurrent = index === 0
        return (
          <li key={`${step.type}-${step.timestamp}`} className={styles.step}>
            <span className={styles.rail} aria-hidden="true">
              <span
                className={cx(styles.dot, isCurrent ? DOT_CLASS[step.type] : styles.dotNeutral)}
              />
              <span className={styles.connector} />
            </span>

            <div className={styles.content}>
              <p className={cx('type-title-sm', styles.title)}>{step.title}</p>
              <p className={cx('type-caption-sm', styles.timestamp)}>{step.timestamp}</p>

              {isCurrent && (
                <>
                  <p className={cx('type-body-sm', styles.description)}>
                    {step.description}
                    {step.link && (
                      <>
                        {' '}
                        <Hyperlink href="#" size="sm" underline>
                          {step.link}
                        </Hyperlink>
                      </>
                    )}
                  </p>

                  {step.reason && (
                    <div className={styles.reason}>
                      {step.reason.map((paragraph, i) => (
                        <p key={i} className={cx('type-body-sm', styles.reasonText)}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
