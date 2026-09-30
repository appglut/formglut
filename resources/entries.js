import { cQ as staticMethods, cI as reactExports, c3 as getEntryCounts, c6 as getForms, c1 as getEntries, ct as jsxRuntimeExports, V as _pg, i as FontAwesomeIcon, bw as faStar, a as Button, aR as faEye, aN as faEnvelope, aP as faEnvelopeOpen, bA as faTrash, k as Input, b9 as faMagnifyingGlass, aj as exportEntriesUrl, aT as faFileExport, bq as faRotateRight, aV as faFileLines, ae as deleteEntry, cV as toggleEntryStar, d0 as updateEntryStatus, S as Skeleton, ad as createRoot } from "./chunks/api-CWyUJK1g.js";
import { _ as __ } from "./chunks/default-i18n-C5tja8m9.js";
import { f as faStar$1 } from "./chunks/index-B2JIQhJi.js";
import { H as Header } from "./chunks/Header-_5qZLjlg.js";
import { P as Popconfirm, S as Space } from "./chunks/index-BZvS3h5m.js";
import { T as Tooltip } from "./chunks/index-CN2x6X4U.js";
import { S as Select } from "./chunks/index-DP98aNXk.js";
import { D as DatePicker, F as ForwardTable } from "./chunks/Table-ClOQlK7w.js";
import "./chunks/index-Bou9GWnt.js";
import "./chunks/ActionButton-Cy37dVq6.js";
import "./chunks/EllipsisOutlined-CPbMzcRo.js";
staticMethods.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: "top"
});
function extractDisplayFields(fieldsData) {
  if (!fieldsData || typeof fieldsData !== "object") return { name: "-", email: "-" };
  const values = Object.values(fieldsData);
  const email = values.find((v) => typeof v === "string" && v.includes("@")) || "-";
  const name = values.find((v) => typeof v === "string" && v.length > 0 && !v.includes("@")) || "-";
  return { name, email };
}
function SkeletonLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 180, height: 32 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 240, height: 18, marginTop: 8 } })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-filter-tabs", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 90, height: 32 } }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-table-toolbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-toolbar-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 200, height: 32 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 240, height: 32 } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 20px" }, children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #fafafa" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 24, height: 16 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 160, height: 16 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 130, height: 12, marginTop: 4 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 120, height: 16 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 70, height: 24 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 140, height: 16 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Avatar, { active: true, size: 28, shape: "circle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Avatar, { active: true, size: 28, shape: "circle" })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end", padding: "16px 20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 200, height: 24 } }) })
    ] })
  ] });
}
const STATUS_TABS = [
  { key: "", label: __("All", "formglut"), field: "all" },
  { key: "unread", label: __("Unread", "formglut"), field: "unread" },
  { key: "read", label: __("Read", "formglut"), field: "read" },
  { key: "starred", label: __("Starred", "formglut"), field: "starred" },
  { key: "spam", label: __("Spam", "formglut"), field: "spam" },
  { key: "trash", label: __("Trash", "formglut"), field: "trash" }
];
function Entries() {
  const [entries, setEntries] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [page, setPage] = reactExports.useState(1);
  const [perPage, setPerPage] = reactExports.useState(20);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchText, setSearchText] = reactExports.useState("");
  const [searchInput, setSearchInput] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [formFilter, setFormFilter] = reactExports.useState("");
  const [dateRange, setDateRange] = reactExports.useState(null);
  const dateParams = dateRange ? { date_from: dateRange[0].format("YYYY-MM-DD"), date_to: dateRange[1].format("YYYY-MM-DD") } : {};
  const [orderby, setOrderby] = reactExports.useState("created_at");
  const [order, setOrder] = reactExports.useState("DESC");
  const [selectedRowKeys, setSelectedRowKeys] = reactExports.useState([]);
  const [forms, setForms] = reactExports.useState([]);
  const [counts, setCounts] = reactExports.useState({ all: 0, unread: 0, read: 0, starred: 0, spam: 0, trash: 0 });
  reactExports.useEffect(() => {
    const admin = window.formglut_admin || {};
    if (admin.filter_form_id) {
      setFormFilter(String(admin.filter_form_id));
    }
  }, []);
  const loadCounts = reactExports.useCallback(async () => {
    try {
      const params = { ...dateParams };
      if (formFilter) params.form_id = formFilter;
      const result = await getEntryCounts(params);
      setCounts(result.counts || {});
    } catch (_) {
    }
  }, [formFilter, dateRange]);
  const loadForms = reactExports.useCallback(async () => {
    try {
      const result = await getForms({ per_page: 100 });
      setForms(result.forms || []);
    } catch (_) {
    }
  }, []);
  const loadEntries = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: perPage,
        search: searchText,
        orderby,
        order,
        ...dateParams
      };
      if (formFilter) params.form_id = formFilter;
      if (statusFilter === "starred") {
        params.starred = 1;
      } else if (statusFilter) {
        params.status = statusFilter;
      }
      const result = await getEntries(params);
      setEntries(result.entries || []);
      setTotal(result.total || 0);
    } catch (err) {
      staticMethods.error(err.message || __("Failed to load entries.", "formglut"));
    } finally {
      setLoading(false);
    }
  }, [page, perPage, searchText, orderby, order, formFilter, statusFilter, dateRange]);
  reactExports.useEffect(() => {
    loadForms();
  }, [loadForms]);
  reactExports.useEffect(() => {
    loadCounts();
  }, [loadCounts]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      loadEntries();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadEntries]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);
  async function handleDelete(id) {
    try {
      await deleteEntry(id);
      staticMethods.success(__("Entry deleted.", "formglut"));
      loadEntries();
      loadCounts();
    } catch (err) {
      staticMethods.error(err.message || __("Failed to delete entry.", "formglut"));
    }
  }
  async function handleToggleStar(id, currentStarred) {
    try {
      await toggleEntryStar(id);
      staticMethods.success(currentStarred ? __("Star removed.", "formglut") : __("Entry starred.", "formglut"));
      loadEntries();
      loadCounts();
    } catch (err) {
      staticMethods.error(err.message || __("Failed to toggle star.", "formglut"));
    }
  }
  async function handleMarkStatus(id, status) {
    try {
      await updateEntryStatus(id, status);
      staticMethods.success(__("Status updated.", "formglut"));
      loadEntries();
      loadCounts();
    } catch (err) {
      staticMethods.error(err.message || __("Failed to update status.", "formglut"));
    }
  }
  async function handleBulkDelete() {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map((id) => deleteEntry(id)));
      staticMethods.success(__("%s entry(s) deleted.", "formglut").replace("%s", selectedRowKeys.length));
      setSelectedRowKeys([]);
      loadEntries();
      loadCounts();
    } catch (err) {
      staticMethods.error(__("Failed to delete some entries.", "formglut"));
    }
  }
  async function handleBulkStatus(status) {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map((id) => updateEntryStatus(id, status)));
      staticMethods.success(__("%s entry(s) updated.", "formglut").replace("%s", selectedRowKeys.length));
      setSelectedRowKeys([]);
      loadEntries();
      loadCounts();
    } catch (err) {
      staticMethods.error(__("Failed to update some entries.", "formglut"));
    }
  }
  const columns = [
    {
      title: __("Name", "formglut"),
      dataIndex: "fields_data",
      render: (fieldsData, r) => {
        const display = extractDisplayFields(fieldsData);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: _pg.entry_detail + "&entry_id=" + r.id,
                style: { fontWeight: r.status === "unread" ? 700 : 600, color: "#1a1a2e" },
                children: display.name
              }
            ),
            r.starred ? /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar, style: { color: "#f59e0b", fontSize: 12, marginLeft: 6 } }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "#94a3b8", marginTop: 2 }, children: display.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-row-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: _pg.entry_detail + "&entry_id=" + r.id, children: __("View", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-action-sep", children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: () => handleMarkStatus(r.id, r.status === "read" ? "unread" : "read"), children: r.status === "read" ? __("Mark Unread", "formglut") : __("Mark Read", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-action-sep", children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Popconfirm,
              {
                title: __("Delete this entry?", "formglut"),
                okText: __("Delete", "formglut"),
                cancelText: __("Cancel", "formglut"),
                okButtonProps: { danger: true },
                onConfirm: () => handleDelete(r.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "fg-action-delete", children: __("Delete", "formglut") })
              }
            )
          ] })
        ] });
      }
    },
    {
      title: __("Form", "formglut"),
      dataIndex: "form_title",
      width: 180,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "#64748b" }, children: v || "-" })
    },
    {
      title: __("Status", "formglut"),
      dataIndex: "status",
      width: 110,
      render: (v) => {
        const labels = { unread: __("Unread", "formglut"), read: __("Read", "formglut"), spam: __("Spam", "formglut"), trash: __("Trash", "formglut") };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-status-badge " + v, children: labels[v] || v });
      }
    },
    {
      title: __("Date", "formglut"),
      dataIndex: "created_at",
      width: 180,
      sorter: true,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "#64748b" }, children: v })
    },
    {
      title: __("Action", "formglut"),
      dataIndex: "action",
      width: 140,
      align: "center",
      render: (_, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { size: 4, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("View entry", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "text",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }),
            style: { color: "#64748b" },
            href: _pg.entry_detail + "&entry_id=" + r.id
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: r.starred ? __("Unstar", "formglut") : __("Star", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "text",
            icon: r.starred ? /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar, style: { color: "#f59e0b" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar$1 }),
            onClick: () => handleToggleStar(r.id, r.starred)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: r.status === "read" ? __("Mark unread", "formglut") : __("Mark read", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "text",
            icon: r.status === "read" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelopeOpen }),
            style: { color: "#64748b" },
            onClick: () => handleMarkStatus(r.id, r.status === "read" ? "unread" : "read")
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Popconfirm,
          {
            title: __("Delete this entry?", "formglut"),
            okText: __("Confirm", "formglut"),
            cancelText: __("Cancel", "formglut"),
            okButtonProps: { danger: true },
            onConfirm: () => handleDelete(r.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Delete entry", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrash }), danger: true }) })
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { activePage: "Entries" }),
    loading && entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLoader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-title", children: __("Entries", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-subtitle", children: __("View all form submissions", "formglut") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-filter-tabs", children: STATUS_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "fg-filter-tab" + (statusFilter === tab.key ? " active" : ""),
          onClick: () => {
            setStatusFilter(tab.key);
            setPage(1);
          },
          children: [
            tab.label,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-filter-count", children: counts[tab.field] || 0 })
          ]
        },
        tab.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-wrap", children: [
        selectedRowKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-bulk-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            selectedRowKeys.length,
            " ",
            __("selected", "formglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => handleBulkStatus("read"), children: __("Mark Read", "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => handleBulkStatus("unread"), children: __("Mark Unread", "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => handleBulkStatus("spam"), children: __("Mark Spam", "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Popconfirm,
            {
              title: __("Delete %s entry(s)?", "formglut").replace("%s", selectedRowKeys.length),
              okText: __("Delete", "formglut"),
              cancelText: __("Cancel", "formglut"),
              okButtonProps: { danger: true },
              onConfirm: handleBulkDelete,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", danger: true, children: __("Delete", "formglut") })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", type: "text", onClick: () => setSelectedRowKeys([]), children: __("Clear", "formglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-toolbar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-toolbar-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Select,
              {
                placeholder: __("All Forms", "formglut"),
                style: { width: 200 },
                allowClear: true,
                value: formFilter || void 0,
                onChange: (v) => {
                  setFormFilter(v ? String(v) : "");
                  setPage(1);
                },
                children: forms.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Select.Option, { value: String(f.id), children: f.title }, f.id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: __("Search entries...", "formglut"),
                prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }),
                style: { width: 240 },
                value: searchInput,
                onChange: (e) => setSearchInput(e.target.value),
                allowClear: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DatePicker.RangePicker,
              {
                value: dateRange,
                onChange: (v) => {
                  setDateRange(v && v[0] && v[1] ? v : null);
                  setPage(1);
                },
                allowClear: true,
                style: { width: 250 }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-toolbar-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Download the entries shown by the current filters as CSV (opens in Excel)", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }),
                href: exportEntriesUrl({ form_id: formFilter, status: statusFilter === "starred" ? "" : statusFilter, starred: statusFilter === "starred" ? 1 : "", search: searchText, ...dateParams }),
                children: __("Export CSV", "formglut")
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Refresh", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "text",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateRight, spin: loading, style: { color: "#64748b" } }),
                onClick: loadEntries
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ForwardTable,
          {
            dataSource: entries,
            columns,
            rowKey: "id",
            rowSelection: {
              selectedRowKeys,
              onChange: setSelectedRowKeys
            },
            scroll: { x: "max-content" },
            loading: loading && entries.length > 0,
            onChange: (_pag, _filters, sorter) => {
              if (sorter.field) {
                setOrderby(sorter.field);
                setOrder(sorter.order === "ascend" ? "ASC" : "DESC");
              } else {
                setOrderby("created_at");
                setOrder("DESC");
              }
            },
            pagination: {
              current: page,
              pageSize: perPage,
              total,
              showSizeChanger: true,
              showTotal: (t) => `${t} ${__("entries total", "formglut")}`,
              onChange: (p, ps) => {
                setPage(p);
                setPerPage(ps);
              }
            },
            locale: {
              emptyText: !searchText && !formFilter ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-empty-state", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-title", children: __("No entries yet", "formglut") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-desc", children: __("Entries will appear here when people submit your forms.", "formglut") })
              ] }) : __("No entries match your filters.", "formglut")
            },
            style: { padding: "0 8px" }
          }
        )
      ] })
    ] })
  ] });
}
createRoot(document.getElementById("formglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(Entries, {}));
//# sourceMappingURL=entries.js.map
