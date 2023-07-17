import { useParams } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "./styles.module.sass";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  depth?: number;
  values?: string[];
  includeParamsAsPath?: boolean;
};

/**
 * Breadcrumb component that uses useLocation and useParams to properly structure
 * breadcrumbs with proper urls and it's values.
 * The depth value should also be the values length value
 *
 * !IMPORTANT! duplicate url locations doesn't work for now. (settings/visitors/settings won't work, but settings/visitors/settings1 will)
 *
 * @param {number} depth -  Level of depth starting from the end (number of breadcrumbs to display)
 * @param {string[]} values - Text that should be displayed for each corresponding breadcrumb link
 * otherwise check translation at desktop.settings.breadcrumbs.{value}
 * @param {boolean} includeParamsAsPath - Boolean flag in case we render something else by url parameters
 * and we want to include parameters as part of path.
 *
 * Example: /settings/visitors/devices/ and /settings/visitors/devices/<device_id>
 */

const Breadcrumbs = ({
  depth = 0,
  values,
  includeParamsAsPath = false,
}: Props) => {
  const { Breadcrumbs, Breadcrumb, Seperator, Active } = styles;

  const params = useParams();
  const path = useRouter();

  let breadcrumbs = path.pathname
    .split("/")
    .filter((segment) => segment !== "");

  if (!depth && values?.length) {
    depth = values.length ?? 0;
  }

  if (params && !includeParamsAsPath) {
    Object.values(params)
      .filter((value) => value)
      .forEach((param) =>
        breadcrumbs.splice(breadcrumbs.indexOf(param as string), 1)
      );
  }

  if (breadcrumbs.length && depth) {
    breadcrumbs = breadcrumbs.reverse().splice(0, depth).reverse();
  }

  return (
    <div className={Breadcrumbs}>
      {breadcrumbs.map((segment, index, array) => {
        // Either remove or keep params as part of url path
        const location = !includeParamsAsPath
          ? Object.values(params).reduce(
              (acc: string, value: string | undefined) =>
                acc.split(value ?? "").join(""),
              path.pathname
            )
          : path.pathname;

        const url = location
          .split(array[index + 1])[0]
          .replace(/\/$/, ""); /* Strip trailing slash */

        return (
          <div
            className={Breadcrumb}
            key={index}
          >
            {index !== array.length - 1 ? (
              <>
                <Link href={url}>
                  {values?.length ? values?.[index] : segment}
                </Link>
                <div className={Seperator}>
                  <ChevronRightIcon />
                </div>
              </>
            ) : (
              <span className={Active}>
                {values?.length ? values?.[index] : segment}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
