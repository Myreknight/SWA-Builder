import { ALL_SPEEDS } from '../types/ship';
import type { SpeedSetting } from '../types/ship';

const YAW_OPTIONS = [0, 1, 2, 3];

interface ShipEditorSpeedYawProps {
  speed: SpeedSetting[];
  onToggleSpeed: (speed: number) => void;
  onUpdateYaw: (speed: number, jointIndex: number, yaw: number) => void;
}

export function ShipEditorSpeedYaw({ speed, onToggleSpeed, onUpdateYaw }: ShipEditorSpeedYawProps) {
  return (
    <section className="editor-section">
      <h3>Speed &amp; Yaw</h3>
      <div className="speed-editor">
        {ALL_SPEEDS.map((s) => {
          const entry = speed.find((e) => e.speed === s);
          const active = entry !== undefined;
          return (
            <div key={s} className="speed-editor__row">
              <label className="checkbox">
                <input type="checkbox" checked={active} onChange={() => onToggleSpeed(s)} />
                <span>Speed {s}</span>
              </label>
              {active && (
                <div className="joint-editor">
                  {entry.yaws.map((yaw, jointIndex) => (
                    <label key={jointIndex} className="field field--narrow">
                      <span>Yaw {jointIndex + 1}</span>
                      <select value={yaw} onChange={(e) => onUpdateYaw(s, jointIndex, Number(e.target.value))}>
                        {YAW_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
